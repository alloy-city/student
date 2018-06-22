class Calendar {
    constructor(model, options, date) {
        this.Options = {
            Color: '',
            LinkColor: '',
            NavShow: true,
            NavVertical: false,
            NavLocation: '',
            DateTimeShow: true,
            DateTimeFormat: 'mmm, yyyy',
            DatetimeLocation: '',
            EventClick: '',
            EventTargetWholeDay: false,
            DisabledDays: [],
            ModelChange: model
        };
        // Overwriting default values
        for (var key in options) {
            this.Options[key] = typeof options[key] == 'string' ? options[key].toLowerCase() : options[key];
        }

        model ? this.Model = model : this.Model = {};
        this.Today = new Date();

        this.Selected = this.Today
        this.Today.Month = this.Today.getMonth();
        this.Today.Year = this.Today.getFullYear();
        if (date) { this.Selected = date }
        this.Selected.Month = this.Selected.getMonth();
        this.Selected.Year = this.Selected.getFullYear();

        this.Selected.Days = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDate();
        this.Selected.FirstDay = new Date(this.Selected.Year, (this.Selected.Month), 1).getDay();
        this.Selected.LastDay = new Date(this.Selected.Year, (this.Selected.Month + 1), 0).getDay();

        this.Prev = new Date(this.Selected.Year, (this.Selected.Month - 1), 1);
        if (this.Selected.Month == 0) { this.Prev = new Date(this.Selected.Year - 1, 11, 1); }
        this.Prev.Days = new Date(this.Prev.getFullYear(), (this.Prev.getMonth() + 1), 0).getDate();
    }
}

export default Calendar