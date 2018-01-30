<?php

namespace Tests\Feature;

use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ApiTest extends TestCase
{
    /**
     * Checking if api response returns all the users
     */
    public function testApiUsers()
    {
        $users = array_map(
            function ($item) {
                return [
                    'id'   => $item['id'],
                    'name' => $item['name'],
                ];
            },
            User::orderBy('id', 'ASC')->get()->toArray()
        );
        $response = $this->get('/api/users');
        $response
            ->assertStatus(200)
            ->assertJson($users)
        ;
    }

    public function testApiShort()
    {
        $response = $this->get('/api/short');
        $response
            ->assertStatus(200)
            ->assertJson([
                'result' => 'error'
            ])
        ;
        $response = $this->get('/api/short?user_id=2&original_url=http://ya.ru');
        $response
            ->assertStatus(200)
            ->assertJson([
                'result' => 'OK',
                'message' => 'https://goo.gl/A1bN'
            ])
        ;
    }

    public function testApiOriginal()
    {
        $response = $this->get('/api/original');
        $response
            ->assertStatus(200)
            ->assertJson([
                'result' => 'error'
            ])
        ;
        $response = $this->get('/api/original?short_url=nosuchshorturl');
        $response
            ->assertStatus(200)
            ->assertJson([
                'result' => 'error'
            ])
        ;
        $response = $this->get('/api/original?short_url=https://goo.gl/A1bN');
        $response
            ->assertStatus(200)
            ->assertJson([
                'result' => 'OK',
                'user_id' => '2'
            ])
        ;
    }
}
