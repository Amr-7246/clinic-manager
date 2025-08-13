import axios from "axios";

export const uploadAsset = async (file: File, type: 'image' | 'video' = 'image') => {
    try {
        const signatureRes = await axios.get(`http://localhost:5000/cloudinary_signature`);
        const { signature: signatuer, timestamp, CloudName, APIKey } = signatureRes.data;

        const formData = new FormData();
        formData.append("file", file);
        formData.append('api_key', APIKey);
        formData.append('timestamp', timestamp);
        formData.append('signature', signatuer);
        
        // Set resource type based on file type
        const resourceType = type === 'video' ? 'video' : 'image';
        
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${CloudName}/${resourceType}/upload`,
            formData
        );

        return {
            secure_url: res.data.secure_url,
            publicId: res.data.public_id
        };
    } catch (error) {
        console.error('Asset upload failed:', error);
        throw new Error('Failed to upload asset');
    }
};

export const deleteAsset = async (publicId: string, type: 'image' | 'video' = 'image') => {
    try {
        await axios.delete(`http://localhost:5000/cloudinary_delete`, {
            data: {
                publicId,
                resourceType: type
            }
        });
        return true;
    } catch (error) {
        console.error('Asset deletion failed:', error);
        throw new Error('Failed to delete asset');
    }
};
