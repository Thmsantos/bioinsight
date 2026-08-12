import Base from "../../base/Base.ts"

class Insight extends Base {
    public filename!: string;
    
    public date!: string;
    
    public water!: number;

    public protein!: number;
    
    public fatMass!: number;
    
    public weight!: number;
    
    public bmi!: number;
    
    public fatPercentage!: number;
     
    public basalRate!: number;
    
    public visceralFat!: number;
    
    public waistAndHips!: number;

    public userId!: string;
}

export default Insight;
