<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Catalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CatalogController extends Controller
{
    public function index()
    {
        $catalogs = Catalog::orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($cat) {
                return [
                    'id' => $cat->id,
                    'title' => $cat->title,
                    'cname' => $cat->title,
                    'date_text' => $cat->date_text,
                    'cdate' => $cat->date_text,
                    'year' => $cat->year,
                    'is_active' => $cat->is_active,
                    'sort_order' => $cat->sort_order,
                    'thumbnail_url' => $cat->thumbnail_path ? asset('storage/' . $cat->thumbnail_path) : null,
                    'cImg' => $cat->thumbnail_path ? asset('storage/' . $cat->thumbnail_path) : null,
                ];
            });

        return response()->json($catalogs);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date_text' => 'nullable|string|max:255',
            'year' => 'nullable|integer',
            'thumbnail' => 'nullable|image|max:10240', // up to 10MB
            'is_active' => 'nullable|boolean',
        ]);

        $thumbPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbPath = $request->file('thumbnail')->store('catalogs', 'public');
        }

        $catalog = Catalog::create([
            'title' => $validated['title'],
            'date_text' => $validated['date_text'] ?? null,
            'year' => $validated['year'] ?? date('Y'),
            'thumbnail_path' => $thumbPath,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => Catalog::count(),
        ]);

        return response()->json([
            'message' => 'Catalog created successfully',
            'catalog' => $catalog,
            'thumbnail_url' => $thumbPath ? asset('storage/' . $thumbPath) : null,
        ], 201);
    }

    public function show(Catalog $catalog)
    {
        return response()->json([
            ...$catalog->toArray(),
            'thumbnail_url' => $catalog->thumbnail_path ? asset('storage/' . $catalog->thumbnail_path) : null,
        ]);
    }

    public function update(Request $request, Catalog $catalog)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'date_text' => 'nullable|string|max:255',
            'year' => 'nullable|integer',
            'thumbnail' => 'nullable|image|max:10240',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('thumbnail')) {
            if ($catalog->thumbnail_path && Storage::disk('public')->exists($catalog->thumbnail_path)) {
                Storage::disk('public')->delete($catalog->thumbnail_path);
            }
            $catalog->thumbnail_path = $request->file('thumbnail')->store('catalogs', 'public');
        }

        if ($request->has('title')) $catalog->title = $validated['title'];
        if ($request->has('date_text')) $catalog->date_text = $validated['date_text'];
        if ($request->has('year')) $catalog->year = $validated['year'];
        if ($request->has('is_active')) $catalog->is_active = $request->boolean('is_active');

        $catalog->save();

        return response()->json([
            'message' => 'Catalog updated successfully',
            'catalog' => $catalog,
            'thumbnail_url' => $catalog->thumbnail_path ? asset('storage/' . $catalog->thumbnail_path) : null,
        ]);
    }

    public function destroy(Catalog $catalog)
    {
        if ($catalog->thumbnail_path && Storage::disk('public')->exists($catalog->thumbnail_path)) {
            Storage::disk('public')->delete($catalog->thumbnail_path);
        }
        $catalog->delete();

        return response()->json(['message' => 'Catalog deleted successfully']);
    }
}
