class UploadAdapter {
    constructor(loader, onUploaded) {
        this.loader = loader;
        this.onUploaded = onUploaded;
    }

    upload() {
        return this.loader.file.then(file => {
            const data = new FormData();
            data.append("file", file);

            return fetch("/api/blog/upload-image", {
                method: "POST",
                body: data
            })
            .then(response => response.json())
            .then(result => {
                if (result.url) {
                    this.onUploaded(result.url); // 이미지 URL 저장
                    return { default: result.url };
                }
                throw new Error("Upload failed");
            });
        });
    }

    abort() {
        // optional: abort logic
    }
}

export default UploadAdapter;