// Starting points
const kFaceOppoTrench = new Waypoint(new Translation2d(120, -120), 0, 0, "");
const kFaceFrontBarrier = new Waypoint(new Translation2d(120, 0), 0, 0, "");
const kFacePowerPort = new Waypoint(new Translation2d(120, 67), 0, 0, "");

//Fixed points
const kExampleStartingPoint = new Waypoint(new Translation2d(20, 115), 0, 0, "");
const kBeforeAutoShootingPoint = new Waypoint(new Translation2d(185, 40), 0, 0, "");
const kAutoShootingPoint = new Waypoint(new Translation2d(205, 67), 0, 0, "");
const kPowerPortPosition = new Waypoint(new Translation2d(0, 67), 0, 0, "");

/*-----------TWO_ON_OPPO_TRENCH--------------*/
const to_oppo_cell_1 = new Waypoint(new Translation2d(210, -120), 60, 0, "");
const to_oppo_cell_2 = new Waypoint(new Translation2d(240, -120), 60, 0, "");
const to_oppo_cell_3 = new Waypoint(new Translation2d(245, -135), 60, 0, "");

//half steal
const to_oppo_trench_1 = new Waypoint(new Translation2d(315, -140), 60, 0, "");
const to_oppo_trench_2 = new Waypoint(new Translation2d(375, -140), 60, 0, "");
//full steal
const to_oppo_trench_3 = new Waypoint(new Translation2d(400, -125), 60, 0, "");
const to_oppo_trench_4 = new Waypoint(new Translation2d(410, -100), 60, 0, "");
const to_oppo_trench_5 = new Waypoint(new Translation2d(393, -57), 60, 0, "");

//full steal reverse
const to_oppo_trench_1_reverse = to_oppo_trench_5;
const to_oppo_trench_2_reverse = new Waypoint(new Translation2d(400, -75), 60, 0, "");
const to_oppo_trench_3_reverse = new Waypoint(new Translation2d(380, -90), 60, 0, "");
const to_oppo_trench_4_reverse = new Waypoint(new Translation2d(300, -125), 60, 0, "");
const to_oppo_trench_5_reverse = new Waypoint(new Translation2d(240, -125), 60, 0, "");

/* -------- Front Barrier------------ */
const to_front_barrier_1 = new Waypoint(new Translation2d(180, -8), 60, 0, "");//the pivot
const to_front_barrier_2 = new Waypoint(new Translation2d(215, 5), 60, 0, "");
const to_front_barrier_3 = to_front_barrier_1;
const to_front_barrier_4 = new Waypoint(new Translation2d(210, -20), 60, 0, "");
const to_front_barrier_5 = new Waypoint(new Translation2d(225, -14), 60, 0, "");

/* ------ Back Barrier --------*/
const to_back_barrier_1 = new Waypoint(new Translation2d(242, 80), 60, 0, "");//need turn
const to_back_barrier_2 = new Waypoint(new Translation2d(250, 60), 60, 0, "");

const to_trench_pivot = new Waypoint(new Translation2d(210, 135), 60, 0, "");//need turn

/* ------Back Barrier To Front Barrier(BTF)----- */
const to_BTF_start = kAutoShootingPoint;
//const to_BTF_pivot_to_front_barrier = new Translation2d(185, 55);//need turn

/* ------ Trench ------- */
const to_trench_1 = new Waypoint(new Translation2d(210, 105), 60, 0, "");
const to_trench_1_add = new Waypoint(new Translation2d(220, 125), 60, 0, "");
const to_trench_2 = new Waypoint(new Translation2d(240, 135), 60, 0, "");
const to_trench_3 = new Waypoint(new Translation2d(300, 135), 60, 0, "");

//full trench
const to_trench_4 = new Waypoint(new Translation2d(365, 140), 60, 0, "");
//turn 180 if go to front barrier

var paths = {
    trench: [
        kFaceOppoTrench, to_oppo_cell_1, to_oppo_cell_2, to_oppo_cell_3,
        to_oppo_trench_1, to_oppo_trench_2, to_oppo_trench_3, to_oppo_trench_4,
        to_oppo_trench_5
    ],
    trenchInverse:[
        to_oppo_trench_1_reverse, to_oppo_trench_2_reverse, to_oppo_trench_3_reverse,
        to_oppo_trench_4_reverse, to_oppo_trench_5_reverse, kBeforeAutoShootingPoint,
        kAutoShootingPoint
    ],
    toFrontBarrier: [
        kAutoShootingPoint, kBeforeAutoShootingPoint, to_front_barrier_1, to_front_barrier_2
    ],
    frontBarrierToPivot:[
        to_front_barrier_2, to_front_barrier_1
    ],
    pivotToFrontBarrier:[
        to_front_barrier_1, to_front_barrier_4, to_front_barrier_5
    ],
    frontBarrierTo:[
        to_front_barrier_5, to_front_barrier_4, kBeforeAutoShootingPoint, 
        kAutoShootingPoint
    ],
    toBackBarrier: [
        kAutoShootingPoint, to_back_barrier_1, to_back_barrier_2
    ],
    backBarrierTo:[
        to_back_barrier_2, to_back_barrier_1, kAutoShootingPoint
    ],
    toCloseTrench:[
        to_trench_1, to_trench_1_add, to_trench_2, to_trench_3
    ],
    closeTrenchTo:[
        to_trench_3, kAutoShootingPoint
    ],
    toCloseFullTrench:[
        to_trench_1, to_trench_1_add, to_trench_2, to_trench_3, to_trench_4
    ],
    closeFullTrenchTo: [
        to_trench_4, kAutoShootingPoint
    ]
}

function onChangePattern() {
    let val = document.getElementById('select_pattern').value;
    console.log(val);
    let points = paths[val];
    if (val != '' && val.length != 0 && points != undefined) {
        waypoints = []
        $("tbody").empty();
        points.forEach((wpd) => {
            let wp = new Waypoint(new Translation2d(wpd.position.x, wpd.position.y), wpd.speed, wpd.radius, wpd.comment);
            // console.log(wp);
            $("tbody").append("<tr>"
                + "<td><input value='" + wp.position.x + "'></td>"
                + "<td><input value='" + wp.position.y + "'></td>"
                + "<td><input value='" + wp.radius + "'></td>"
                + "<td><input value='" + wp.speed + "'></td>"
                + "<td class='comments'><input placeholder='Comments' value='" + wp.comment + "'></td>"
                + "<td><button onclick='$(this).parent().parent().remove();''>Delete</button></td></tr>"
            );
        })
        update();
        $('input').unbind("change paste keyup");
        $('input').bind("change paste keyup", function () {
            console.log("change");
            clearTimeout(wto);
            wto = setTimeout(function () {
                update();
            }, 500);
        });
    } else {
        update();
        $("tbody").empty();
        clear();
    }
}