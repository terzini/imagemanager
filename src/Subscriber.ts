import {ILazyImageProps} from "./ILazyImageProps";

export class Subscriber{
    public Target: any;
    public LazyImageProps: ILazyImageProps;

    constructor( props: ILazyImageProps, target: any){
        this.LazyImageProps = props;
        this.Target = target;
    }

    public onLoadComplete(){
        this.Target.src = this.LazyImageProps.src;
    }    
}