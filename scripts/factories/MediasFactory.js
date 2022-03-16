import Photo from '../models/Photo.js'
import Video from '../models/Video.js'

/**
 * Données de la video ou de la video via le mediaFactory
 * @property {object} data
 */

export default class MediasFactory {
  constructor (data) {
    this.media = null
    if (Object.prototype.hasOwnProperty.call(data, 'image')) {
      this.media = new Photo(data)
    } else if (Object.prototype.hasOwnProperty.call(data, 'video')) {
      this.media = new Video(data)
    }
  }

  display () {
    return this.media.getMedia()
  }
}
