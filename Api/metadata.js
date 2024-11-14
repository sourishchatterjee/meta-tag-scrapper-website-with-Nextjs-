import axios from 'axios';

export const metaFn = async (url) => {
  try {
    // Make sure you are passing a valid URL to the API
    const { data } = await axios.get(`/api/scrape-meta?url=${encodeURIComponent(url)}`);
    console.log(data, 'metatags');
    return data;  // Return the fetched meta tags data
  } catch (error) {
    console.error('Error fetching meta tags:', error);
    throw new Error('Failed to fetch meta tags');
  }
};
