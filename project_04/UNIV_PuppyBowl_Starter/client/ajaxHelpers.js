// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2301-FTB-PT-WEB-PT';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

// APIURL = https://fsa-puppy-bowl.herokuapp.com/api/2301-FTB-PT-WEB-PT/players/1517


export const fetchAllPlayers = async () => {
    try {
        const res = await fetch(APIURL);
        const result = await res.json();
        if (result.error) {
            throw result.error;
        }

        return result.data.players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!',err);
    }
};

export const fetchSinglePlayer = async (playerId) => {
    try {
        const res = await fetch(`${APIURL}/${playerId}`);
        const result = await res.json();
        if (result.error) {
            throw result.error
        }
        return result.data.player
    } catch (err) {
        console.error(`Can't fetch player`,err);
    }
};

export const addNewPlayer = async (playerObj) => {
    try {
        const res = await fetch(
            `${APIURL}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playerObj.name,
                    breed: playerObj.breed,
                }),
            }
        )
        const result = await res.json();
        console.log(result);
    } catch (err) {
        console.error(err);
    }
};

export const removePlayer = async (playerId) => {

};
