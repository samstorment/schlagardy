import type { Round } from "$lib/models/game.model";

export async function layoutLoad({ session, params }) {

    const ordinal = parseInt(params.ordinal);
    const round: Round = session.game.rounds.find((r: Round) => r.ordinal === ordinal);

    
    if (!round) {
        return {
            status: 404
        }
    }

    const numRows = round.board.rows.length;
    const numCols = round.board.categories.length;

    return {
        stuff: {
            round,
            numRows,
            numCols,
            ordinal
        }
    };
}