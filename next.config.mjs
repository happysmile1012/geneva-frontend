/** @type {import('next').NextConfig} */
const nextConfig = {
    onDemandEntries: {
        // period (in ms) where the server will keep pages in the buffer
        maxInactiveAge: 15 * 60 * 1000, // 15 minutes
        // number of pages that should be kept simultaneously without being disposed
        pagesBufferLength: 4,
    }
};

export default nextConfig;
