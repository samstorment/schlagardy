<script lang="ts">
import { goto } from "$app/navigation";

    import { session } from "$app/stores";

    import type Game from "$lib/models/game.model";

    import type { Round } from "$lib/models/game.model";
    import Icon from "@iconify/svelte";

    export let game: Game;
    export let round: Round;

    let href = `/game/${game.id}/round/${round.ordinal}`;

    function onClick() {
        goto(`${href}/preview`);
    }
</script>


<div class="round" on:click={onClick}>
    <a href={`${href}/preview`}>
        <b>Round {round.ordinal}</b>
    </a>
    <p>{round.title || "Unnamed Round"}</p>
    <p class="board-size">Board Size {round.board.rows.length} x {round.board.categories.length}</p>

    {#if $session.user?.id === game.author.id}
        <div class="round-controls">
            <a href={`${href}/edit`}><Icon icon="ci:edit" /></a>
            <button type="button" on:click|stopPropagation={() => null}><Icon icon="bi:trash-fill" /></button>
        </div>
    {/if}
</div>

<style>
    .round {
        position: relative;
        flex: 1;
        min-width: fit-content;
        /* max-width: max-content; */
        padding: .5em;
        background-color: var(--clr-bg-accent);
        border: 1px solid var(--clr-bg-dark);
        border-radius: .25em;
        cursor: pointer;
    }

    .board-size {
		color: var(--clr-font-accent);
		font-size: .9rem;
	}

    .round-controls {
        display: none;
        position: absolute;
        background-color: var(--clr-bg-dark);
        border: 1px solid var(--clr-bg-dark);
        color: var(--clr-font-accent);
        top: 0;
        right: .3em;
        transform: translateY(-50%);
        z-index: 1;
        border-radius: .25em;
        overflow: hidden;
    }
    
    .round-controls > * {
        flex: 1;
        width: 100%;
        height: 100%;
        border-radius: 0;
        border: none;
        font-size: 1.2rem;
        padding: .1em;
        background-color: var(--clr-bg-accent);
    }

    .round:hover .round-controls, 
    .round:focus-within .round-controls {
        display: grid;
        grid-auto-flow: column;
        gap: 1px;
    }
</style>