import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    // First find the Place ID
     const searchUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Tropical%20Breeze%20RF&inputtype=textquery&fields=place_id&locationbias=point:38.4984525,-75.7240555&key=${apiKey}`;
    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    
    const placeId = searchData.candidates?.[0]?.place_id;
    if (!placeId) return NextResponse.json({ error: 'Place not found' }, { status: 404 });

    // Then get the reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`;
    const detailsRes = await fetch(detailsUrl);
    const detailsData = await detailsRes.json();

    const result = detailsData.result;
    return NextResponse.json({
      name: result.name,
      rating: result.rating,
      total: result.user_ratings_total,
      reviews: result.reviews || [],
    });
  } catch (error) {
    console.error('Reviews error:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
