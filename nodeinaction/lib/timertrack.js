/**
 * Created by Administrator on 2016-05-27.
 */
var qs = require('querystring');
/*1.发送HTML响应*/
exports.sendHtml = function (res, html) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}
/*2.解析POST数据*/
exports.parseReceivedData = function (req, cb) {
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        var data = qs.parse(body);
        cb(data);
    })
};
/*3.渲染表单*/
exports.actionForm = function (id, path, lable) {
    var html = "<form method='POST' action='" + path + "'>" +
        "<input type='hidden' name='id' value='" + id + "'>" +
        "<input type='submit' value='" + lable + "'>" +
        "</form>"
    return html;
}
/*4.像表中添加数据*/
exports.add = function (db, req, res) {
    //接收并解析通过POST传来的数据
    exports.parseReceivedData(req, function (work) {
        db.query(
            "INSERT INTO work (hours,date,description) VALUES (?,?,?)",
            [work.hours, work.date, work.description],
            function (err) {
                if (err)throw err;
                exports.show(db, res);
            }
        );
    })
};
/*5.删除数据*/
exports.delete = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query(
            "DELETE FROM work WHERE id=?",
            [work.id],
            function (err) {
                if (err)throw err;
                exports.show(db, res);
            }
        )
    })
};

/*6.修改数据*/
exports.update = function (db, req, res) {
    exports.parseReceivedData(req, function (work) {
        db.query(
            "UPDATE work SET archived=1 WHERE id=?",
            [work.id],
            function (err) {
                if (err)throw err
                exports.show(db, res);
            }
        )
    })
}
/*7.获取数据*/
exports.show = function (db, res, showArchived) {
    var query = "SELECT * FROM work  " +
        "WHERE archived=? " +
        "ORDER BY date DESC";
    console.log(query);
    var archivedValue = (showArchived) ? 1 : 0;
    db.query(
        query,
        [archivedValue],
        function (err, rows) {
            if (err)throw err;
            var html = (showArchived)
                ? ''
                : '<a href="/archived">A</a><br>';
            html += exports.workHitlistHtml(rows);
            html += exports.workFormHtml();
            exports.sendHtml(res, html);
        }
    )
}
exports.showArchived = function (db, res) {
    exports.show(db, res, true);
}
/*8.渲染查询记录*/
exports.workHitlistHtml = function (rows) {
    var html = '<table>';
    for (var i in rows) {
        html += '<tr>';
        html += '<td>' + rows[i].date + '</td>';
        html += '<td>' + rows[i].hours + '</td>';
        html += '<td>' + rows[i].description + '</td>';
        if (!rows[i].archived) {
            html += '<td>' + exports.workArachiveForm(rows[i].id) + '</td>';
        }
        html += '<td>' + exports.workDeleteForm(rows[i].id) + '</td>';
        html += '</tr>'
    }
    html += "</table>"
    return html;
}
/*9.渲染添加表单*/
exports.workFormHtml = function () {
    var html = '<form method="POST" action="/">' +
        '<p>DATE:<input type="text" name="date"></p>' +
        '<p>HOUR:<input type="text" name="hours" ></p>' +
        '<p>任务：<textarea name="description"></textarea></p>' +
        '<input type="submit" value="添加">' +
        '</form>';
    return html;
}
/*10.渲染归档表单*/
exports.workArachiveForm = function (id) {
    return exports.actionForm(id, '/archive', 'Archive');
}

/*11.渲染删除工作记录表单*/
exports.workDeleteForm = function (id) {
    return exports.actionForm(id, 'delete', 'DELETE')
}