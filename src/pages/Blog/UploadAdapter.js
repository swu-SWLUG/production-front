import axios from "axios";

class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            (file) =>
                new Promise((resolve, reject) => {
                    const data = new FormData();
                    data.append("upload", file);

                    axios
                        .post("/api/blog/upload-image", data, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                        .then((response) => {
                            if (response.data.uploaded) {
                                resolve({
                                    default: response.data.url,
                                });
                            } else {
                                reject(response.data.error?.message || "업로드 실패");
                            }
                        })
                        .catch((error) => {
                            reject(error.response?.data?.error?.message || "이미지 업로드에 실패했습니다.");
                        });
                })
        );
    }

    abort() {
        // 업로드 중단이 필요한 경우 구현
    }
}

export default UploadAdapter;