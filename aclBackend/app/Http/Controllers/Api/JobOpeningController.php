<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobOpening;
use Illuminate\Http\Request;

class JobOpeningController extends Controller
{
    public function index()
    {
        $jobs = JobOpening::where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'desc')
            ->get();
        return response()->json($jobs);
    }

    public function allAdmin()
    {
        $jobs = JobOpening::orderBy('id', 'desc')->get();
        return response()->json($jobs);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'nullable|string|max:255',
            'job_type' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:255',
            'salary_range' => 'nullable|string|max:100',
            'deadline' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $job = JobOpening::create([
            ...$validated,
            'job_type' => $validated['job_type'] ?? 'Full Time',
            'location' => $validated['location'] ?? 'Head Office',
            'salary_range' => $validated['salary_range'] ?? 'Negotiable',
            'is_active' => $request->boolean('is_active', true),
            'sort_order' => JobOpening::count(),
        ]);

        return response()->json([
            'message' => 'Job opening created successfully',
            'job' => $job,
        ], 201);
    }

    public function update(Request $request, JobOpening $jobOpening)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'department' => 'nullable|string|max:255',
            'job_type' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:255',
            'salary_range' => 'nullable|string|max:100',
            'deadline' => 'nullable|string|max:100',
            'description' => 'nullable|string',
            'requirements' => 'nullable|string',
            'is_active' => 'nullable|boolean',
        ]);

        $jobOpening->update($validated);

        return response()->json([
            'message' => 'Job opening updated successfully',
            'job' => $jobOpening,
        ]);
    }

    public function destroy(JobOpening $jobOpening)
    {
        $jobOpening->delete();
        return response()->json(['message' => 'Job opening deleted successfully']);
    }
}
