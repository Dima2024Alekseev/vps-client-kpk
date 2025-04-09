// ExcelExporter.js
import ExcelJS from 'exceljs';

const ExcelExporter = {
    exportStudents: async (students, directions, selectedDirection, currentGroupName) => {
        // Создаем новую книгу
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Студенты');

        // Получаем информацию о направлении
        const direction = directions.find(d => d._id === selectedDirection);
        const directionName = direction?.name || 'ИСиП';
        const directionDescription = direction?.description || 'Информационные системы и программирование';
        const groupName = currentGroupName || 'все группы';

        // Добавляем строку с информацией о направлении
        worksheet.addRow([`Направление: ${directionName} (${directionDescription}), Группа: ${groupName}`]);

        // Объединяем ячейки для заголовка направления
        worksheet.mergeCells(`A1:F1`);

        // Стиль для строки направления
        const directionRow = worksheet.getRow(1);
        directionRow.eachCell((cell) => {
            cell.font = {
                bold: true,
                size: 14,
                color: { argb: 'FFFFFFFF' }
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4472C4' }
            };
        });

        // Добавляем заголовки таблицы сразу после направления (строка 2)
        worksheet.addRow([
            'Фамилия',
            'Имя',
            'Отчество',
            'Группа',
            'Специальность',
            'Номер студ. билета'
        ]);

        // Стиль для заголовков таблицы
        const headerRow = worksheet.getRow(2);
        headerRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4472C4' }
            };
            cell.font = {
                bold: true,
                color: { argb: 'FFFFFFFF' }
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // Устанавливаем ширину столбцов и выравнивание
        worksheet.columns = [
            { width: 20, alignment: { horizontal: 'left' } },    // Фамилия
            { width: 15, alignment: { horizontal: 'left' } },    // Имя
            { width: 20, alignment: { horizontal: 'left' } },    // Отчество
            { width: 10, alignment: { horizontal: 'center' } },  // Группа
            { width: 25, alignment: { horizontal: 'center' } },  // Специальность
            { width: 25, alignment: { horizontal: 'center' } }   // Номер студ. билета
        ];

        // Добавляем данные
        students.forEach(student => {
            const newRow = worksheet.addRow([
                student.lastName || '',
                student.firstName || '',
                student.middleName || '',
                student.group?.name || '',
                student.specialty?.name || '',
                student.studentId || ''
            ]);

            // Применяем выравнивание для конкретных столбцов (D, E, F)
            ['D', 'E', 'F'].forEach(col => {
                const cell = newRow.getCell(col);
                cell.alignment = { vertical: 'middle', horizontal: 'center' };
            });
        });

        // Применяем стиль к данным (границы)
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 2) { // Пропускаем строки заголовков (1 и 2)
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            }
        });

        // Генерируем имя файла
        const fileName = `Студенты_${directionName}_${groupName}_${new Date().toLocaleDateString()}.xlsx`;

        // Сохраняем файл
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
    },
    exportTeachers: async (teachers, departments, selectedDepartment) => {
        // Создаем новую книгу
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Преподаватели');

        // Получаем информацию о кафедре/ПЦК
        const department = departments.find(d => d._id === selectedDepartment);
        const departmentName = department?.name || 'Все ПЦК';

        // Добавляем строку с информацией о кафедре
        worksheet.addRow([`Преподаватели: ${departmentName}`]);

        // Объединяем ячейки для заголовка
        worksheet.mergeCells(`A1:D1`);

        // Стиль для строки заголовка
        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.font = {
                bold: true,
                size: 14,
                color: { argb: 'FFFFFFFF' }
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4472C4' }
            };
        });

        // Добавляем заголовки таблицы
        worksheet.addRow([
            'Фамилия',
            'Имя',
            'Отчество',
            'ПЦК'
        ]);

        // Стиль для заголовков столбцов
        const columnHeaderRow = worksheet.getRow(2);
        columnHeaderRow.eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF4472C4' }
            };
            cell.font = {
                bold: true,
                color: { argb: 'FFFFFFFF' }
            };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });

        // Устанавливаем ширину столбцов и выравнивание
        worksheet.columns = [
            { width: 20, alignment: { horizontal: 'center' }, },  // Фамилия
            { width: 15, alignment: { horizontal: 'center' }, },  // Имя
            { width: 20, alignment: { horizontal: 'center' }, },  // Отчество
            { width: 80, alignment: { horizontal: 'center' } }  // ПЦК
        ];

        // Добавляем данные
        teachers.forEach(teacher => {
            const newRow = worksheet.addRow([
                teacher.lastName || '',
                teacher.firstName || '',
                teacher.middleName || '',
                teacher.department?.name || ''
            ]);

            // Применяем выравнивание для столбца с ПЦК
            const departmentCell = newRow.getCell('D');
            departmentCell.alignment = { vertical: 'middle', horizontal: 'center' };
        });

        // Применяем стиль к данным (границы)
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 2) { // Пропускаем строки заголовков (1 и 2)
                row.eachCell((cell) => {
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' }
                    };
                });
            }
        });

        // Генерируем имя файла
        const fileName = `Преподаватели_${departmentName}_${new Date().toLocaleDateString()}.xlsx`;

        // Сохраняем файл
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
    }
};

export default ExcelExporter;