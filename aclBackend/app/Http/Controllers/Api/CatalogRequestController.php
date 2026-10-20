<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CatalogRequest;
use Illuminate\Http\Request;

class CatalogRequestController extends Controller
{
    public function index()
    {
        $requests = CatalogRequest::with('catalog')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($requests);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'catalog_id' => 'nullable|exists:catalogs,id',
            'catalog_name' => 'nullable|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'company' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'nullable|string',
        ]);

        $entry = CatalogRequest::create($validated);

        return response()->json([
            'message' => 'Request submitted successfully',
            'request' => $entry,
        ], 201);
    }

    public function update(Request $request, CatalogRequest $catalogRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,sent,rejected',
        ]);

        $catalogRequest->update($validated);

        return response()->json([
            'message' => 'Request status updated',
            'request' => $catalogRequest,
        ]);
    }

    public function destroy(CatalogRequest $catalogRequest)
    {
        $catalogRequest->delete();
        return response()->json(['message' => 'Request deleted successfully']);
    }
}
