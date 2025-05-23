import { useQuery } from '@tanstack/react-query';

const fetchPosts = async () => {
    const response = await fetch('http://localhost:4000/api/files');
    return response.json();
};

const usePosts = () => {
    return useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
};

export default usePosts;