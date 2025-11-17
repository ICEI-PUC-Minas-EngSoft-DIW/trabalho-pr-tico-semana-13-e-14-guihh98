function getRandomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateCourseEvents(courses, categoryColor) {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    const events = [];

    courses.forEach(course => {
        const startDate = getRandomDate(today, nextMonth);
        const durationInDays = Math.floor(Math.random() * 7) + 1;
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + durationInDays);

        events.push({
            title: course.title,
            start: startDate.toISOString().split('T')[0],
            end: endDate.toISOString().split('T')[0],
            backgroundColor: categoryColor,
            borderColor: categoryColor,
            extendedProps: {
                author: course.author,
                category: course.category,
                level: course.level,
                duration: course.duration
            }
        });
    });

    return events;
}

async function initializeCalendar() {
    try {
        const data = await courseService.getAllCourses();
        
        const rendaFixaEvents = generateCourseEvents(data.rendaFixa, '#4CAF50');
        const topLastMonthEvents = generateCourseEvents(data.topLastMonth, '#2196F3');
        
        const allEvents = [...rendaFixaEvents, ...topLastMonthEvents];

        const calendarEl = document.getElementById('calendar');
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'pt-br',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek'
            },
            events: allEvents,
            eventClick: function(info) {
                alert(
                    `Curso: ${info.event.title}\n` +
                    `Autor: ${info.event.extendedProps.author}\n` +
                    `Categoria: ${info.event.extendedProps.category}\n` +
                    `Nível: ${info.event.extendedProps.level}\n` +
                    `Duração: ${info.event.extendedProps.duration}`
                );
            },
            height: 'auto'
        });

        calendar.render();
    } catch (error) {
        console.error('Erro ao inicializar calendário:', error);
    }
}

document.addEventListener('DOMContentLoaded', initializeCalendar);
