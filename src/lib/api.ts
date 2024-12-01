export const get = async (url: string) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (e: any) {
        return {
            success: false,
            error: e.message,
        }
    }
}

export const post = async (url: string, body: any) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            body
        });
        return await response.json();
    } catch (e: any) {
        return {
            success: false,
            error: e.message,
        }
    }
}

export const put = async (url: string, body: any) => {
    try {
        const response = await fetch(url, {
            method: "PUT",
            body
        });
        return await response.json();
    } catch (e: any) {
        return {
            success: false,
            error: e.message,
        }
    }
}

export const del = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
        return await response.json();
    } catch (e: any) {
        return {
            success: false,
            error: e.message,
        }
    }
} 