<?php

namespace App\Http\Controllers;

use App\Models\ListPedidos;
use Illuminate\Http\Request;

class listController extends Controller
{
    public function listarPedidos(Request $request)
    {
        $ListPedido = ListPedido::all();
        return response()->json($ListPedido);
    }

    public function registrarPedidos(Request $request)
    {
        $newPedido = ListPedido();
        $newPedido->nome = $request->nome;
        $newPedido->iten = $request->iten;
        $newPedido->qtd = $request->qtd;
        $newPedido->statusP = $request->statusP;

        $newPedido->save();
        return response()->json('success');
    }

    public function updatePedidos(ListPedido $pedido, Request $request)
    {
    
        $pedido->nome = $request->nome;
        $pedido->iten = $request->iten;
        $pedido->qtd = $request->qtd;
        $pedido->statusP = $request->statusP;

        $pedido->save();
        return response()->json('success');
    }

    public function editarPedidos(ListPedido $pedido, Request $request)
    {
    
        return response()->json($pedido);
    }

    
    public function deletarPedidos(ListPedido $pedido, Request $request)
    {
        $pedido->delete();
        return response()->json('success');
    }
}
