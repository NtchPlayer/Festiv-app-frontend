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
  faHeart as fasHeart,
  faEllipsis,
  faArrowLeft,
  faArrowRightFromBracket,
  faUserPen,
  faComment,
  faCalendarDays,
  faWind
} from '@fortawesome/free-solid-svg-icons'

import {
  faHeart as farHeart,
  faTrashCan
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
  farHeart,
  faTrashCan,
  faEllipsis,
  faArrowLeft,
  faArrowRightFromBracket,
  faUserPen,
  faComment,
  faCalendarDays,
  faWind
)

export default FontAwesomeIcon
