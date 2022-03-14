<?php

declare(strict_types=1);

namespace App\Application\Uniapp\Controller;

use App\Annotation\View;
use App\Application\Admin\Lib\RenderParam;
use App\Application\Uniapp\Middleware\CorsMiddleware;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Annotation\Middleware;
use Hyperf\HttpServer\Annotation\RequestMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use Hyperf\HttpServer\Contract\ResponseInterface;

/**
 * @Controller(prefix="/uniapp")
 */
class UniappController
{
    /**
     * @Middleware(CorsMiddleware::class)
     * @RequestMapping(path="test/index")
     */
    public function test(ResponseInterface $response, RequestInterface $request)
    {
//        $response->withStatus(500);
        return $response->json(['msg' => "ok", 'data' => $request->getQueryParams(), 'code' => 200]);
    }

    /**
     * vue3编译之后放在asset文件夹
     * @GetMapping(path="assets/{file_name}")
     */
    public function assets($file_name, ResponseInterface $response)
    {
        $file_path = BASE_PATH . '/app/Application/Uniapp/View/uniapp/unpackage/dist/build/h5/assets/' . $file_name;

        return $response->download($file_path);
    }

    /**
     * @GetMapping(path="static/js/{file_name}")
     */
    public function staticJs($file_name, ResponseInterface $response)
    {
        $file_path = BASE_PATH . '/app/Application/Uniapp/View/uniapp/unpackage/dist/build/h5/static/js/' . $file_name;

        return $response->download($file_path);
    }

    /**
     * @GetMapping(path="static/{file_name}")
     */
    public function static($file_name, ResponseInterface $response)
    {
        $file_path = BASE_PATH . '/app/Application/Uniapp/View/uniapp/unpackage/dist/build/h5/static/' . $file_name;

        return $response->download($file_path);
    }

    /**
     * 渲染单页应用的index.html，做全局通配 [{id:.+}]
     * @View()
     * @GetMapping(path="/uniapp/[{id:.+}]")
     */
    public function index()
    {
        return RenderParam::display('unpackage/dist/build/h5/index')
            ->setLayout(false);
    }
}
