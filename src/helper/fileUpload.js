

export const fileUpload = async (file) => {
    if (!file) throw new Error("File hasnt been recieved")
    const cloudUrl = "https://api.cloudinary.com/v1_1/doutyv9vl/upload";
    const formData = new FormData();
    formData.append("upload_preset", "journal")
    formData.append("file", file)

    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData
        })
        console.log(resp);
        if( !resp.ok ) throw new Error("Cant upload file")
        
        const cloudResp = await resp.json()
        return cloudResp.secure_url

    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }

}