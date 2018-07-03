import * as text from "./text.js"
import * as UserDisplay from "./userDisplay.js"
import * as AlloyVids from "./alloy-vids.js"
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

text.applyText()

UserDisplay.userDisplay()
AlloyVids.setPlaylist()
// whatsAppGroups()
Product.getRecent()
// getMissions()
Settings.settingsText()
// Content.classroomGetLatestEclasses()
Content.showThemes()
// Live.SocketEClassConnect()
Grenadine.setGrenadineLinks()
ActiveTab.activeTab()

window.ActiveTab = ActiveTab
window.Enlist = Enlist
window.AlloyVids = AlloyVids
window.Settings = Settings
window.Logout = Logout

window.Student = {
    Evidence,
    ActiveTab,
    Product,
    Live,
    ActiveResource,
    Content,
    UserDisplay
}