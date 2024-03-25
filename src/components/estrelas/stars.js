import React from 'react'

export default function stars(avaliacao) {
    function CalcStar(avaliacao) {
        const tamanho = parseInt(avaliacao);
        let stars = '';

        for (let i = 0; i < tamanho; i++) {
            stars += '&#9733; ';
        }

        return stars;
    }

    return (
        <div>{stars}</div>
    )
}
