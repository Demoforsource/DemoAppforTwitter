function getTimecard(start, end) {
    return jQuery.post("api/twitter", "", "json");
}

$('.timecard-filter-dropdown li > a', namespace).on('click', function () {
    var timecard = $(this).attr('data-timecard'),
        value = $(this).text(),
        li = $(this).closest('li');

    $('.overlay', namespace).fadeIn('fast', function () {

        // Close dropdown
        $('.timecard-filter-dropdown', namespace).foundation('close');

        // Effectively unhide all filter options in dropdown
        $('.timecard-filter-dropdown ul > li', namespace).removeClass('select-active');

        // Hide current filter selection in dropdown
        li.addClass('select-active');

        // Update select item text with currently-selected filter option
        $('.timecard-filter-select', namespace).text(value);

        // AJAX call chain
        var dateRange = timecard.split('-');
        var startDate = dateRange[0];
        var endDate = dateRange[1];

        getTimecard(startDate, endDate)
            .done(function (response) {
                if (response.TimeCard && response.TimecardSummary) {
                    var container = $('.timecard-table-container', namespace),
                        timecard = "",
                        summary = "",
                        nbsp = "&nbsp;";

                    // Clear default empty state message
                    container.html("");

                    // Generate Timecard Table
                    timecard += '<table class="timecard-table"><thead><tr><th>Date</th><th>Paycode</th><th>Amount</th><th>In</th><th>Transfer</th><th>Out</th><th>Daily</th><th>Cumulative</th></tr></thead><tbody><tr class="mobile-label"><td>Date</td></tr>';

                    $.each(response.TimeCard, function (i, row) {
                        if (i === 0) {
                            timecard += '<tr class="table-row-active">';
                        } else {
                            timecard += '<tr>';
                        }

                        timecard += '<td data-th="Date"><span>' + (row.Date !== null ? row.Date : nbsp) + '</span></td>';
                        timecard += '<td data-th="Paycode"><span>' + (row.Paycode !== null ? row.Paycode : nbsp) + '</span></td>';
                        timecard += '<td data-th="Amount"><span>' + (row.Amount !== null ? row.Amount : nbsp) + '</span></td>';
                        timecard += '<td data-th="In"><span>' + (row.ClockInTime !== null ? row.ClockInTime : nbsp) + '</span></td>';
                        timecard += '<td data-th="Transfer"><span>' + (row.TransferNotes !== null ? row.TransferNotes : nbsp) + '</span></td>';
                        timecard += '<td data-th="Out"><span>' + (row.ClockOutTime !== null ? row.ClockOutTime : nbsp) + '</span></td>';
                        timecard += '<td data-th="Daily"><span>' + (row.DailyTotalHours !== null ? row.DailyTotalHours : nbsp) + '</span></td>';
                        timecard += '<td data-th="Cumulative"><span>' + (row.Cumulative !== null ? row.Cumulative : nbsp) + '</span></td>';
                        timecard += '</tr>';
                    });

                    timecard += '</tbody></table>';

                    $(timecard).appendTo(container);

                    // Generate Timecard Summary Table
                    summary += '<table class="timecard-table"><thead><tr><th>Account</th><th>Paycode</th><th>Amount</th><th>Wages</th></tr></thead><tbody><tr class="mobile-label"><td>Account</td></tr>';
                    $.each(response.TimecardSummary, function (i, account) {
                        var accountId = account.LaborAccountId;

                        $.each(account.Totals, function (i, item) {
                            console.log(item);
                            if (i === 0) {
                                summary += '<tr class="table-row-active">';
                            } else {
                                summary += '<tr>';
                            }
                            summary += '<td data-th="Account"><span>' + accountId + '</span></td>';
                            summary += '<td data-th="Paycode"><span>' + (item.PayCode !== null ? item.PayCode : nbsp) + '</span></td>';
                            summary += '<td data-th="Amount"><span>' + (item.TotalHours !== null ? item.TotalHours : nbsp) + '</span></td>';
                            summary += '<td data-th="Wages"><span>' + (item.TotalWagesForPayCode !== null ? item.TotalWagesForPayCode : nbsp) + '</span></td>';
                            summary += '</tr>';
                        });
                    });

                    summary += '</tbody></table>';

                    $(summary).appendTo(container);
                } else {
                    console.log('getTimecard error | Empty or invalid response:', response);
                }
            })
            .fail(function (error) {
                console.log('getTimecard fatal error:', error);
            })
        .then(function () {
            $('.ViewMyTimecard', namespace).hide();
            $('.ViewPayPeriod', namespace).fadeIn('fast', function () {
                $('.overlay', namespace).fadeOut();
            });
        }, function (err) {
            console.log('Promise Error | GetTimecard() error:', err);
        });

    });
});