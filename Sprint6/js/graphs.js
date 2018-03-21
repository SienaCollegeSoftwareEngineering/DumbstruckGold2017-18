var genderPie = null;
var agePie = null;
var ethnPie = null;
function bakePies(){
    if (genderPie != null){
        genderPie.destroy();
        genderPie = null;
    }
    if (agePie != null){
        agePie.destroy();
        agePie = null;
    }
    if (ethnPie != null){
        ethnPie.destroy();
        ethnPie = null;
    }
    genderPie = new d3pie("genderPie", {
        header: {
            title:{
                text: "Gender"
            }
        },
        size: {
            canvasHeight: 200,
            canvasWidth: 200
        },
        data: {
            content:[
            {
                label: "Male",
                value: gender.numMales,
                        color: "#370E44"
            },
                {
                label: "Female",
                value: gender.numFemales,
                        color: "#9146A7"
            }
            ]
        },
        effects: {
                load:{
                    effect:"none" //removes loading animation
                }
            },
        labels: {
            inner: {
                format : "value"
            }
        }
	});
    
    agePie = new d3pie("agePie", {
           header:{
               title:{
                   text: "Age"
               }
           },
        size: {
            canvasHeight: 200,
            canvasWidth: 200
        },
            data:{
                content:[
                    {
                        label: "0-2",
                        value: ages.age02,
                        color: "#DAC1E1"
                    },
                    {
                        label: "3-7",
                        value: ages.age37,
                        color: "#A96FBA"
                    },
                    {
                        label: "8-12",
                        value: ages.age812,
                        color: "#9146A7"
                    },
                    {
                        label: "13-19",
                        value: ages.age1319,
                        color: "#791E94"
                    },
                    {
                        label: "20-36",
                        value: ages.age2036,
                        color: "#64197A"
                    },
                    {
                        label: "37-65",
                        value: ages.age3765,
                        color: "#4E145F"
                    },
                    {
                        label: "66+",
                        value: ages.age66,
                        color: "#370E44"
                    }
                ]
            },
            effects: {
                load:{
                    effect:"none" //removes loading animation
                }
            },
        labels: {
            inner: {
                format : "value"
            }
        }
        });
    
     ethnPie = new d3pie("ethnicPie", {
           header:{
               title:{
                   text: "Ethnicity"
               }
           },
         size: {
            canvasHeight: 200,
            canvasWidth: 500
        },
            data:{
                content:[
                    {
                        label: "Caucasian",
                        value: ethnicities.numCauc,
                        color: "#DAC1E1"
                    },
                    {
                        label: "Hispanic",
                        value: ethnicities.numHisp,
                        color: "#A96FBA"
                    },
                    {
                        label: "African",
                        value: ethnicities.numAfrc,
                        color: "#9146A7"
                    },
                    {
                        label: "Asian",
                        value: ethnicities.numAsia,
                        color: "#791E94"
                    }
                    
                ]
            },
         effects: {
                load:{
                    effect:"none" //removes loading animation
                }
            },
        labels: {
            inner: {
                format : "value"
            }
        }
        });
}

    
        