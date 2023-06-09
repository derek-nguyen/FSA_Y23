import React, { Fragment, useState } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    // Pulls the props from the parent component (App)
    const { setSearchResults, setIsLoading, featuredResult, searchTerm, searchValue, title } = props;

    return (
        <span className='content'>
            <a href="#" onClick={async (event) => {
                event.preventDefault();
                setIsLoading(true);
                // console.log(event);

                try {
                    const result = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                    setSearchResults(result);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            }}>{title}</a>
        </span>
    )
}

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
const Feature = (props) => {
    const { featuredResult, setIsLoading, setSearchResults } = props;

    return (
        <>
            {featuredResult ?
                <main id='feature'>
                    <div className='object-feature'>
                        <header>
                            <h3>{featuredResult.title}</h3>
                            <h4>{featuredResult.dated}</h4>
                        </header>
                        <section className="facts">
                            <span className="title">Culture</span>
                            <Searchable
                                title={featuredResult.culture}
                                searchTerm={'culture'} //should be the name of the primary museum resource
                                searchValue={featuredResult.culture}
                                setIsLoading={setIsLoading}
                                setSearchResults={setSearchResults}
                            />
                            {/* <span className="content">{featuredResult.culture}</span> */}
                            <span className="title">Technique</span>
                            <Searchable
                                title={featuredResult.technique}
                                searchTerm={'technique'}
                                searchValue={featuredResult.technique}
                                setIsLoading={setIsLoading}
                                setSearchResults={setSearchResults}
                            />
                            {/* <span className="content">{featuredResult.technique}</span> */}
                            <span className="title">Medium</span>
                            <span className="content">{featuredResult.medium}</span>
                            {/* <Searchable
                                title={featuredResult.medium}
                                searchTerm={'medium'}
                                searchValue={featuredResult.medium}
                                setIsLoading={setIsLoading}
                                setSearchResults={setSearchResults}
                            /> */}

                            <span className="title">Dimensions</span>
                            <span className="content">{featuredResult.dimensions}</span>
                            <span className="title">Person</span>
                            <span className="content">
                                {featuredResult.people ?
                                    featuredResult.people.map((person) => (
                                        <span key={person.personid}>
                                            <Searchable
                                                title={person.name}
                                                searchTerm={'person'}
                                                searchValue={person.displayname}
                                                setIsLoading={setIsLoading}
                                                setSearchResults={setSearchResults}
                                            />
                                            {' '}
                                        </span>
                                    ))
                                    :
                                    <span></span>
                                }
                            </span>
                            <span className="title">Department</span>
                            <span className="content">{featuredResult.department}</span>
                            <span className="title">Division</span>
                            <span className="content">{featuredResult.division}</span>
                            <span className="title">Contact</span>
                            <span className="content">{featuredResult.contact}</span>
                            <span className="title">Credit</span>
                            <span className="content">{featuredResult.creditline}</span>
                        </section>
                        <section className='photos'>
                            {/* <img src={`${featuredResult.primaryimageurl}`} alt='SOMETHING_WORTHWHILE' /> */}
                            {featuredResult.images ?
                                featuredResult.images.map((image) => {
                                    return <img key={image.imageid} src={`${image.baseimageurl}`} alt={`${image.alttext}`} />
                                })
                                :
                                <img></img>
                            }
                        </section>
                    </div>
                </main>
                :
                <main id="feature"></main>
            }
        </>
    )
}

export default Feature;