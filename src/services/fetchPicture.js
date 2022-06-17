const KEY = '26656666-c9df0a89ed3cb80a5684720fa';

export function fetchPicture(picture, page) {
    return (

        fetch(`https://pixabay.com/api/?q=${picture}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
            if (response.ok) {return response.json()}
            return Promise.reject(new Error("Ничего не найдено"))})
    )
}