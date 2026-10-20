<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsArticle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class NewsArticleController extends Controller
{
    public function index()
    {
        $articles = NewsArticle::orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($a) {
                return [
                    'id' => $a->id,
                    'title' => $a->title,
                    'date' => $a->date_text,
                    'date_text' => $a->date_text,
                    'published_at' => $a->published_at,
                    'excerpt' => $a->excerpt,
                    'content' => $a->content,
                    'is_active' => $a->is_active,
                    'img' => $a->image_path ? asset('storage/' . $a->image_path) : null,
                    'image_url' => $a->image_path ? asset('storage/' . $a->image_path) : null,
                ];
            });

        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'date_text' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'nullable|boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('news', 'public');
        }

        $article = NewsArticle::create([
            'title' => $validated['title'],
            'date_text' => $validated['date_text'] ?? date('jS F, Y'),
            'published_at' => $validated['published_at'] ?? now(),
            'excerpt' => $validated['excerpt'] ?? null,
            'content' => $validated['content'] ?? null,
            'image_path' => $imagePath,
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => NewsArticle::count(),
        ]);

        return response()->json([
            'message' => 'Article created successfully',
            'article' => $article,
            'image_url' => $imagePath ? asset('storage/' . $imagePath) : null,
        ], 201);
    }

    public function update(Request $request, NewsArticle $newsArticle)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'date_text' => 'nullable|string|max:255',
            'published_at' => 'nullable|date',
            'excerpt' => 'nullable|string',
            'content' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
            'is_active' => 'nullable|boolean',
        ]);

        if ($request->hasFile('image')) {
            if ($newsArticle->image_path && Storage::disk('public')->exists($newsArticle->image_path)) {
                Storage::disk('public')->delete($newsArticle->image_path);
            }
            $newsArticle->image_path = $request->file('image')->store('news', 'public');
        }

        if ($request->has('title')) $newsArticle->title = $validated['title'];
        if ($request->has('date_text')) $newsArticle->date_text = $validated['date_text'];
        if ($request->has('published_at')) $newsArticle->published_at = $validated['published_at'];
        if ($request->has('excerpt')) $newsArticle->excerpt = $validated['excerpt'];
        if ($request->has('content')) $newsArticle->content = $validated['content'];
        if ($request->has('is_active')) $newsArticle->is_active = $request->boolean('is_active');

        $newsArticle->save();

        return response()->json([
            'message' => 'Article updated successfully',
            'article' => $newsArticle,
            'image_url' => $newsArticle->image_path ? asset('storage/' . $newsArticle->image_path) : null,
        ]);
    }

    public function destroy(NewsArticle $newsArticle)
    {
        if ($newsArticle->image_path && Storage::disk('public')->exists($newsArticle->image_path)) {
            Storage::disk('public')->delete($newsArticle->image_path);
        }
        $newsArticle->delete();

        return response()->json(['message' => 'Article deleted successfully']);
    }
}
