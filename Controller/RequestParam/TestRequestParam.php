<?php

namespace App\Application\Uniapp\Controller\RequestParam;

use App\Annotation\RequestParam;
use App\Controller\RequestParam\BaseRequestParam;

#[RequestParam]
class TestRequestParam extends BaseRequestParam
{
    protected array $rules = [
        'param1' => 'required',
    ];

    protected array $message = [
        'param1.required' => '请输入 param1',
    ];

    private string $param1 = '';

    public function getParam1(): string
    {
        return $this->param1;
    }
}