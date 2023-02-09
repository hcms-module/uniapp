<?php

declare(strict_types=1);

namespace App\Application\Uniapp\Controller;

use App\Annotation\View;
use App\Application\Admin\Lib\RenderParam;
use App\Application\Uniapp\Middleware\CorsMiddleware;
use App\Controller\AbstractController;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Annotation\Middleware;
use Hyperf\HttpServer\Annotation\RequestMapping;
use Hyperf\HttpServer\Contract\ResponseInterface;

#[Controller(prefix: "/uniapp")]
class UniappController extends AbstractController
{
    /**
     * 跨域请求(部署在同一个域名下也可以不用跨域设置)
     */
    #[Middleware(CorsMiddleware::class)]
    #[RequestMapping(path: "test/index")]
    public function test()
    {
        return $this->returnSuccessJson($this->request->getQueryParams());
    }

    /**
     * vue3编译之后放在asset文件夹
     */
    #[GetMapping(path: "assets/{file_name:.+}")]
    public function assets($file_name, ResponseInterface $response)
    {
        $file_path = BASE_PATH . '/app/Application/Uniapp/View/uniapp/unpackage/dist/build/h5/assets/' . $file_name;

        return $response->download($file_path);
    }

    /**
     * 静态资源文件
     */
    #[GetMapping(path: "static/{file_name:.+}")]
    public function static($file_name, ResponseInterface $response)
    {
        $file_path = BASE_PATH . '/app/Application/Uniapp/View/uniapp/unpackage/dist/build/h5/static/' . $file_name;

        return $response->download($file_path);
    }

    /**
     * 渲染单页应用的index.html，做全局通配 [{route:.+}]
     */
    #[View]
    #[GetMapping(path: "/uniapp/[{route:.+}]")]
    public function indexAll($route = '')
    {
        // route 为当前访问的路由
        return RenderParam::display('unpackage/dist/build/h5/index')
            ->setLayout(false);
    }

    #[View]
    #[GetMapping(path: "/uniapp")]
    public function index()
    {
        // route 为当前访问的路由
        return RenderParam::display('unpackage/dist/build/h5/index')
            ->setLayout(false);
    }
}
