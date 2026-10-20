<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::where('is_active', true);

        if ($request->filled('shape')) {
            $query->where('shape', $request->query('shape'));
        }
        if ($request->filled('category')) {
            $query->where('category', $request->query('category'));
        }

        $products = $query->orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($p) {
                return [
                    ...$p->toArray(),
                    'image_url' => $p->image_path ? asset('storage/' . $p->image_path) : null,
                ];
            });

        return response()->json($products);
    }

    public function allAdmin()
    {
        $products = Product::orderBy('id', 'desc')
            ->get()
            ->map(function ($p) {
                return [
                    ...$p->toArray(),
                    'image_url' => $p->image_path ? asset('storage/' . $p->image_path) : null,
                ];
            });

        return response()->json($products);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'shape' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'item_code' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
            'is_featured' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        $product = Product::create([
            'name' => $validated['name'],
            'shape' => $validated['shape'] ?? null,
            'category' => $validated['category'] ?? null,
            'item_code' => $validated['item_code'] ?? null,
            'description' => $validated['description'] ?? null,
            'image_path' => $imagePath,
            'is_featured' => $request->boolean('is_featured', false),
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => Product::count(),
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
            'image_url' => $imagePath ? asset('storage/' . $imagePath) : null,
        ], 201);
    }

    public function show(Product $product)
    {
        return response()->json([
            ...$product->toArray(),
            'image_url' => $product->image_path ? asset('storage/' . $product->image_path) : null,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'shape' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'item_code' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
            'is_featured' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($product->image_path && Storage::disk('public')->exists($product->image_path)) {
                Storage::disk('public')->delete($product->image_path);
            }
            $product->image_path = $request->file('image')->store('products', 'public');
        }

        if ($request->has('name')) $product->name = $validated['name'];
        if ($request->has('shape')) $product->shape = $validated['shape'];
        if ($request->has('category')) $product->category = $validated['category'];
        if ($request->has('item_code')) $product->item_code = $validated['item_code'];
        if ($request->has('description')) $product->description = $validated['description'];
        if ($request->has('is_featured')) $product->is_featured = $request->boolean('is_featured');
        if ($request->has('is_active')) $product->is_active = $request->boolean('is_active');

        $product->save();

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product,
            'image_url' => $product->image_path ? asset('storage/' . $product->image_path) : null,
        ]);
    }

    public function destroy(Product $product)
    {
        if ($product->image_path && Storage::disk('public')->exists($product->image_path)) {
            Storage::disk('public')->delete($product->image_path);
        }
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
