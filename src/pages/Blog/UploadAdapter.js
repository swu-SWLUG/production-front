class UploadAdapter {
    constructor(loader, onUploaded) {
        this.loader = loader;
        this.onUploaded = onUploaded;
    }

    upload() {
        return this.loader.file.then(file => {
            const data = new FormData();
            data.append("upload", file);   // "file" → "upload"로 수정

            return fetch("/api/blog/upload-image", {
                method: "POST",
                body: data
            })
            .then(response => response.json())
            .then(result => {
                if (result.uploaded && result.url) {   // 서버 응답 필드에 맞춤
                    this.onUploaded(result.url);
                    return { default: result.url };
                }
                throw new Error(result.error?.message || "Upload failed");
            });
        });
    }

    abort() {}
}

export default UploadAdapter;