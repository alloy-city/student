import * as text from "./text.js"
import * as UserDisplay from "./userDisplay.js"
import * as Product from "./product"
import * as Enlist from "./enlist.js"
import * as Settings from "./settings.js"
import * as ActiveTab from "./active-tab.js"
import * as Grenadine from "./grenadine.js"
import * as Content from "./content"
import * as Evidence from './evidence'
import * as Logout from "./logout.js"
import * as Live from "./live"
import * as ActiveResource from './active-resource'
import { viewMission } from './viewMission'
import { fetchMeetings } from './meetings'

text.applyText()
UserDisplay.userDisplay()
Product.getRecent()
Settings.settingsText()
Content.showLevels()
Content.search.setSearchListener();
Grenadine.setGrenadineLinks()
ActiveTab.activeTab()
fetchMeetings();

if (localStorage.showPack && localStorage.showPack.length > 0) Product.view(localStorage.showPack);

window.ActiveTab = ActiveTab
window.Enlist = Enlist
window.Settings = Settings
window.Logout = Logout

window.Student = {
    Evidence,
    ActiveTab,
    Product,
    Live,
    ActiveResource,
    Content,
    UserDisplay,
    viewMission
}
