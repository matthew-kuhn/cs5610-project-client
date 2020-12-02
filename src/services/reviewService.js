export const createReview = (text, movieId) =>
    fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ text, movieId }),
        headers: { "content-type": "application/json" },
    });

export const findReviewsForMovie = (movieId) =>
    fetch(`http://localhost:8080/api/movies/${movieId}/reviews`, {
        credentials: "include",
    })
        .then(response => response.json())
