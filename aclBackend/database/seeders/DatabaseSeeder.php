<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteSection;
use App\Models\Catalog;
use App\Models\UpcomingEvent;
use App\Models\NewsArticle;
use App\Models\TeamMember;
use App\Models\JobOpening;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 0. Default Admin Account
        \App\Models\User::updateOrCreate(
            ['email' => 'admin@artisanceramics.com'],
            [
                'name' => 'Admin',
                'password' => \Illuminate\Support\Facades\Hash::make('admin12345'),
            ]
        );
        SiteSection::updateOrCreate(
            ['key' => 'hero'],
            [
                'title' => 'Hero Banner',
                'tagline' => 'A Symphony of Style',
                'subtitle' => 'Crafting fine porcelain and ceramics with timeless perfection.',
                'media_path' => null, // defaults to local fallback video if null
            ]
        );

        SiteSection::updateOrCreate(
            ['key' => 'profile'],
            [
                'title' => 'The glorious journey of a decade',
                'subtitle' => 'Our Factory & Heritage',
                'content' => 'At Artisan Ceramics, precision meets passion. Our state-of-the-art manufacturing plant brings world-class porcelain dinnerware to prestigious tables across the globe.',
                'media_path' => null,
                'thumb_path' => null,
            ]
        );

        SiteSection::updateOrCreate(
            ['key' => 'upcoming_popup'],
            [
                'title' => 'ambiente',
                'subtitle' => '6.-10.2.2026',
                'content' => 'frankfurt/main',
                'data' => [
                    'event_name' => 'Ambiente Frankfurt 2026',
                    'target_date' => '2026-02-06T23:59:59',
                    'hall' => 'Halle Standnr./Hall',
                    'stand' => 'Stand No. --',
                    'is_active' => true,
                ],
            ]
        );

        SiteSection::updateOrCreate(
            ['key' => 'chairman_message'],
            [
                'title' => 'Chairman Message',
                'tagline' => 'Leading with Vision, Passion & Craftsmanship',
                'content' => "Artisan Ceramics was founded on a simple yet enduring premise: to blend artisanal heritage with modern ceramic innovation. We take immense pride in representing Bangladeshi manufacturing excellence on the world stage.",
                'data' => [
                    'chairman_name' => 'Mr. Nader Khan',
                    'designation' => 'Chairman, Artisan Ceramics Limited',
                    'stats' => [
                        ['label' => 'Global Export Markets', 'value' => '25+'],
                        ['label' => 'Annual Production Pieces', 'value' => '10M+'],
                        ['label' => 'Decades of Excellence', 'value' => '10+'],
                    ],
                ],
            ]
        );

        SiteSection::updateOrCreate(
            ['key' => 'contact_info'],
            [
                'title' => 'Contact & Head Office',
                'data' => [
                    'phone' => '+880 2 9883040',
                    'mobile' => '+880 1713 000000',
                    'email' => 'info@artisanceramicsltd.com',
                    'export_email' => 'export@artisanceramicsltd.com',
                    'corporate_office' => 'House 14, Road 16, Gulshan-1, Dhaka-1212, Bangladesh',
                    'factory_address' => 'Kashimpur, Gazipur, Bangladesh',
                ],
            ]
        );

        // 2. Catalogs
        $catalogsData = [
            ['title' => 'Product Catalog 2023', 'date_text' => 'January, 2023', 'year' => 2023, 'sort_order' => 1],
            ['title' => 'Product Catalog 2017', 'date_text' => 'February, 2017', 'year' => 2017, 'sort_order' => 2],
            ['title' => 'Product Catalog 2016', 'date_text' => 'January, 2016', 'year' => 2016, 'sort_order' => 3],
            ['title' => 'Product Catalog 2015', 'date_text' => 'February, 2015', 'year' => 2015, 'sort_order' => 4],
        ];

        foreach ($catalogsData as $cat) {
            Catalog::updateOrCreate(['title' => $cat['title']], [
                'date_text' => $cat['date_text'],
                'year' => $cat['year'],
                'is_active' => true,
                'sort_order' => $cat['sort_order'],
            ]);
        }

        // 3. Upcoming Events
        UpcomingEvent::updateOrCreate(
            ['title' => 'International Trade Fair Germany Messe Frankfurt Fair 2026'],
            [
                'category' => 'Our Upcomming Event',
                'description' => 'We are excited to announce our participation in the prestigious International Trade Fair 2026 at Messe Frankfurt, Germany, continuing our tradition of showcasing excellence. Visit our booth to explore our latest collections, innovative designs, and unparalleled craftsmanship.',
                'date_text' => '06 - 10 February, 2026',
                'location' => 'Messe Frankfurt, Germany',
                'stand_no' => 'Hall Stand No. -- --',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );

        UpcomingEvent::updateOrCreate(
            ['title' => 'Join Us at Ceramic Expo Bangladesh 2025!'],
            [
                'category' => 'Our Upcomming Event',
                'description' => 'We are excited to invite you to Ceramic Expo Bangladesh 2025, the premier event showcasing innovation, craftsmanship, and excellence in the ceramics industry. Visit our booth to explore our latest collections, cutting-edge designs, and high-quality ceramic products.',
                'date_text' => 'November, 2025',
                'location' => 'Dhaka, Bangladesh',
                'stand_no' => 'Pavilion 12',
                'is_active' => true,
                'sort_order' => 2,
            ]
        );

        // 4. News Articles
        $newsData = [
            [
                'title' => 'Honorable Chairman Mr. Nader Khan Receiving National Export Trophy 2021-2022',
                'date_text' => '11th July, 2024',
                'excerpt' => 'Recognition of outstanding export performance and contribution to the national economy in ceramic tableware.',
                'sort_order' => 1,
            ],
            [
                'title' => 'Honorable Chief Executive Officer (CEO) Mr. Mamunur Rashid Receiving National Export Trophy 2020-2021',
                'date_text' => '8th November, 2023',
                'excerpt' => 'Artisan Ceramics Limited awarded for excellence in global ceramic exports.',
                'sort_order' => 2,
            ],
            [
                'title' => 'Honorable Chief Executive Officer (CEO) Mr. Mamunur Rashid Receiving National Export Trophy 2018-2019',
                'date_text' => '22th November, 2022',
                'excerpt' => 'Continuing a proud tradition of international excellence and distinction.',
                'sort_order' => 3,
            ],
        ];

        foreach ($newsData as $n) {
            NewsArticle::updateOrCreate(['title' => $n['title']], [
                'date_text' => $n['date_text'],
                'excerpt' => $n['excerpt'],
                'is_active' => true,
                'sort_order' => $n['sort_order'],
            ]);
        }

        // 5. Team Members
        $directors = [
            ['name' => 'Mr. Nader Khan', 'designation' => 'Chairman', 'group' => 'director', 'sort_order' => 1],
            ['name' => 'Mr. Mamunur Rashid', 'designation' => 'Managing Director & CEO', 'group' => 'director', 'sort_order' => 2],
            ['name' => 'Mrs. Nazneen Khan', 'designation' => 'Director', 'group' => 'director', 'sort_order' => 3],
            ['name' => 'Mr. Tanveer Khan', 'designation' => 'Director', 'group' => 'director', 'sort_order' => 4],
            ['name' => 'Barrister Sarah Khan', 'designation' => 'Director', 'group' => 'director', 'sort_order' => 5],
            ['name' => 'Mr. Zaheed Khan', 'designation' => 'Director', 'group' => 'director', 'sort_order' => 6],
        ];

        foreach ($directors as $d) {
            TeamMember::updateOrCreate(['name' => $d['name']], $d);
        }

        // 6. Job Openings
        JobOpening::updateOrCreate(
            ['title' => 'Creative Graphics Designer'],
            [
                'department' => 'Design & Marketing',
                'job_type' => 'Full Time',
                'location' => 'Head Office, Dhaka',
                'salary_range' => 'Negotiable',
                'deadline' => '28 Feb, 2025',
                'description' => 'We are looking for a creative graphics designer with experience in ceramic decal designs, packaging, and brand presentation.',
                'requirements' => 'Proficiency in Adobe Creative Suite (Photoshop, Illustrator), strong portfolio in product presentation.',
                'is_active' => true,
                'sort_order' => 1,
            ]
        );
    }
}
