<?php

namespace App\Http\Controllers;

use App\ShortUrls;
use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpKernel\Client;

class ApiController extends Controller
{
    /**
     * Returns a full list of users as a JSON-object
     * @return \Illuminate\Http\JsonResponse
     */
    public function users()
    {
        return response()->json(array_map(
                function ($item) {
                    return [
                        'id'   => $item['id'],
                        'name' => $item['name'],
                    ];
                },
                User::orderBy('id', 'ASC')->get()->toArray()
            )
        );
    }

    /**
     * Converts long url to short url via Google API
     * Saves relation between user, long and short urls
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function short(Request $request)
    {
        $result = [
            'result' => 'error',
        ];
        if ($request->query('original_url') && $user = User::find($request->query('user_id'))) {
            $original_url = $this->getOriginalUrl($request->query('original_url'), $user->id);
            // checking if the user has already shortened this url
            $exists = ShortUrls::where('original_url', $original_url)
                ->where('user_id', $user->id)
                ->first()
            ;
            if ($exists) {
                $result['result'] = 'OK';
                $result['message'] = $exists->short_url;
            } else {
                $short = false;
                try {
                    $client = new \Google_Client();
                    $client->setDeveloperKey(env('GOOGLE_API_KEY'));
                    $client->addScope("https://www.googleapis.com/auth/urlshortener");
                    $service = new \Google_Service_Urlshortener($client);
                    $url = new \Google_Service_Urlshortener_Url();
                    $url->longUrl = $original_url;
                    $short = $service->url->insert($url);
                } catch (\Exception $e) {
                    $result['message'] = $e->getMessage();
                }
                if ($short) {
                    $shortUrl = new ShortUrls();
                    $shortUrl->user_id = $user->id;
                    $shortUrl->short_url = $short->id;
                    $shortUrl->original_url = $original_url;
                    $shortUrl->save();
                    $result['result'] = 'OK';
                    $result['message'] = $short->id;
                }
            }
        }
        return response()->json($result);
    }

    /**
     * Detecting user by short url
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function original(Request $request)
    {
        $result = [
            'result' => 'error',
        ];
        if ($shortUrl = ShortUrls::where('short_url', $request->query('short_url'))->first()) {
            $result['result'] = 'OK';
            $result['user_id'] = $shortUrl->user->id;
        }
        return response()->json($result);
    }

    /**
     * Method that adds User Personal Key to URL to make google generate unique short link for every user
     * @param $url
     * @param $user_id
     * @return string
     */
    private function getOriginalUrl($url, $user_id) {
        return $url . (strstr($url, '?') === false ? '?' : '&') . 'upk=' . sha1($user_id);
    }
}
