/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faCircleExclamation,
  faHouse,
  faBullhorn,
  faUser,
  faMessage,
  faMagnifyingGlass,
  faPlus,
  faXmark,
  faImage,
  faHeart as fasHeart
} from '@fortawesome/free-solid-svg-icons'

import {
  faHeart as farHeart
} from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(
  faCircleExclamation,
  faHouse,
  faBullhorn,
  faUser,
  faMessage,
  faMagnifyingGlass,
  faPlus,
  faXmark,
  faImage,
  fasHeart,
  farHeart
)

export default FontAwesomeIcon
