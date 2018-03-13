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
        data: {
            content:[
            {
                label: "Male",
                value: gender.numMales
            },
                {
                label: "Female",
                value: gender.numFemales
            }
            ]
        },
        effects: {
                load:{
                    effect:"none" //removes loading animation
                }
            }
	});
    
    agePie = new d3pie("agePie", {
           header:{
               title:{
                   text: "Age"
               }
           },
            data:{
                content:[
                    {
                        label: "0-2",
                        value: ages.age02
                    },
                    {
                        label: "3-7",
                        value: ages.age37
                    },
                    {
                        label: "8-12",
                        value: ages.age812
                    },
                    {
                        label: "13-19",
                        value: ages.age1319
                    },
                    {
                        label: "20-36",
                        value: ages.age2036
                    },
                    {
                        label: "37-65",
                        value: ages.age3765
                    },
                    {
                        label: "66+",
                        value: ages.age66
                    }
                ]
            },
            effects: {
                load:{
                    effect:"none" //removes loading animation
                }
            }
        });
    
     ethnPie = new d3pie("ethnicPie", {
           header:{
               title:{
                   text: "Ethnicity"
               }
           },
            data:{
                content:[
                    {
                        label: "Caucasian",
                        value: ethnicities.numCauc
                    },
                    {
                        label: "Hispanic",
                        value: ethnicities.numHisp
                    },
                    {
                        label: "African",
                        value: ethnicities.numAfrc
                    },
                    {
                        label: "Asian",
                        value: ethnicities.numAsia
                    }
                    
                ]
            },
         effects: {
                load:{
                    effect:"none" //removes loading animation
                }
            }
        });
}

    
        