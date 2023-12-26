export type ArtworkResponse = {
    pagination: Pagination,
    data: Artwork[],
    info: any,
    config: any
}

type Pagination = {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
    prev_url: string;
    next_url: string;
 }

export type Artwork = {
    id: number,
    title: string,
    date_start: number,
    artist_display: string,
    place_of_origin: string,
    dimensions: string,
    artwork_type_title: string,
    artist_title: string,
    category_titles: string[],
    style_title: string,
    classification_title: string,
    image_id: string
}

type Info = {
    license_text: string,
    license_links: string,
    version: string,
}

type Config = {
    iiif_url: URL,
    website_url: URL
}

