import axios from 'axios';

export const getLiriumBlocks = async () => {
    const response = await axios.get('http://localhost:5001/api/v1/lirium');
    return response.data
}