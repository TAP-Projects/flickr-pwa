import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Photo from './Photo';

export default function PhotoContainer({data}) {
    // Map over the photos array and call Photo for each photo
    const generatePhotos = (data) => {
        // Check for errors
        if (data?.stat === 'ok') {
            // Store the photos array or else store an empty array
            const photos = data?.photos?.photo || [];
            // If there are photos, display them
            if (photos.length > 0) {
                // Map over the photos and return an array of photo elements
                return photos.map(photo => (
                    <Photo photo={photo} key={uuidv4()} />
                ));
            // In the case that the query really has no photos associated with it
            } else {
                return (
                    <li className="not-found">
                        <h3>No results could be found for this search.</h3>
                    </li>
                )
            }
        // If there's been an error on Flickr's end
        } else {
            // Note that the message property only appears in the response when there's been a error, e.g. a malformed parameter.
            return (
                <li className="not-found">
                <h3>There was an error fetching your request.</h3>
                <p>
                    {data?.message}
                </p>
            </li>
            )
        }
    };

    return (
        <div className="photo-container">
            <ul>
                { generatePhotos(data) }
            </ul>
        </div>
    );
}
