import React, { useEffect, useState } from 'react';

/**
 * Don't touch these imports!
 */
import {
    fetchAllCenturies,
    fetchAllClassifications,
    fetchQueryResults
} from '../api';

const Search = (props) => {
    // Make sure to destructure setIsLoading and setSearchResults from the props
    const { setSearchResults, setIsLoading } = props

    /**
     * We are at the Search component, a child of app. This has a form, so we need to use useState for
     * our controlled inputs:
     * 
     * centuryList, setCenturyList (default should be an empty array, []) (Done)
     * classificationList, setClassificationList (default should be an empty array, []) (Done)
     * queryString, setQueryString (default should be an empty string, '') (Done)
     * century, setCentury (default should be the string 'any') (Done)
     * classification, setClassification (default should be the string 'any') (Done)
     */
    const [centuryList, setCenturyList] = useState([])
    const [classificationList, setClassificationList] = useState([])
    const [queryString, setQueryString] = useState('')
    const [century, setCentury] = useState('any')
    const [classification, setClassification] = useState('any')

    /**
     * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
     * 
     * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
     * 
     * Make sure to console.error on caught errors from the API methods.
     */
    useEffect(() => {
        Promise.all([fetchAllCenturies(), fetchAllClassifications()])
            .then(([centuries, classifications]) => {
                setCenturyList(centuries);
                setClassificationList(classifications);
            })
            .catch((err) => {
                console.error(err);
            })
    }, []);

    /**
     * This is a form element, so we need to bind an onSubmit handler to it which:
     * 
     * calls event.preventDefault()
     * calls setIsLoading, set it to true
     * 
     * then, in a try/catch/finally block:
     * 
     * try to:
     * - get the results from fetchQueryResults({ century, classification, queryString })
     * - pass them to setSearchResults
     * 
     * catch: error to console.error
     * 
     * finally: call setIsLoading, set it to false
     */

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const results = await fetchQueryResults({ century, classification, queryString })
            setSearchResults(results);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <form id="search" onSubmit={handleSubmit}>
            <fieldset>
                <label htmlFor="keywords">Query</label>
                <input
                    id="keywords"
                    type="text"
                    placeholder="enter keywords..."
                    value={queryString}
                    onChange={(event) => setQueryString(event.target.value)} />
            </fieldset>
            <fieldset>
                <label htmlFor="select-classification">Classification <span className="classification-count">({classificationList.length})</span></label>
                <select
                    name="classification"
                    id="select-classification"
                    value={classification}
                    onChange={(event) => setClassification(event.target.value)}>
                    <option value="any">Any</option>
                    {classificationList.map((classificationItem) => {
                        return (
                            <option key={classificationItem.id} value={classificationItem.id}>{classificationItem.name}</option>
                        )
                    })}
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="select-century">Century <span className="century-count">({centuryList.length})</span></label>
                <select
                    name="century"
                    id="select-century"
                    value={century}
                    onChange={(event) => setCentury(event.target.value)}>
                    <option value="any">Any</option>
                    {/* map over the centuryList, return an <option /> */}
                    {centuryList.map((centuryItem) => {
                        return (
                            <option key={centuryItem.id} value={centuryItem.id}>{centuryItem.name}</option>
                        )
                    })}
                </select>
            </fieldset>
            <button>SEARCH</button>
        </form>
    )
}

export default Search;