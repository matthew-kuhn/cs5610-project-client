export const createReview = (text, movieId) =>
    fetch("http://localhost:8080/api/reviews", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({text, movieId}),
        headers: {"content-type": "application/json"},
    });

export const findReviewsForMovie = (movieId) =>
    fetch(`http://localhost:8080/api/movies/${movieId}/reviews`, {
        credentials: "include",
    })
        .then(response => response.json())

export const findReviewsForUser = (username) =>
    fetch(`http://localhost:8080/api/users/${username}/reviews`, {
        credentials: "include"
    })
        .then(response => response.json())

export const flagReview = (review) =>
    fetch("http://localhost:8080/api/reviews", {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(review),
        headers: {"content-type": "application/json"},
    })

export const findAllReviews = () =>
    fetch("http://localhost:8080/api/reviews", {
        credentials: "include",
    })
        .then(response => response.json())

export const deleteReview = (reviewId) =>
    fetch(`http://localhost:8080/api/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include"
    })

