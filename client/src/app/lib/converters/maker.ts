import { ConverterBase } from './ConverterBase';
import { Converter } from '../decorators';

@Converter({
    converterId: 'maker',
    roteParams: ['maker']
})
export class MakerConverter extends ConverterBase {

    public convert(paramValue: Array<string>) {
        let value = paramValue[0];
        let active = false;
        let maker, model;
        maker = model = '';
        let result = {};
        if (this.isString(value) && value === 'any') {
            return {
                value: {
                    maker: '',
                    model: ''
                },
                active: active
            };
        }
        if (!value)
            return {
                value: {
                    maker: '',
                    model: ''
                },
                active: active
            };
        let params = value.split(',');
        if (params[0] === 'any')
            return {
                value: {
                    maker: '',
                    model: ''
                },
                active: active
            };
        if (params[1] === 'any') {
            active = true;
            return {
                value: {
                    maker: params[0],
                    model: ''
                },
                active: active
            };
        } else {
            active = true;
            return {
                value: {
                    maker: params[0],
                    model: params[1]
                },
                active: active
            };
        }
    }

    public convertToRoute(value): any {
        if (value.maker && value.model) {
            return { maker: `${value.maker},${value.model}` };
        }
        if (!value.maker)
            return { maker: `any` };
        if (!value.model)
            return { maker: `${value.maker},any` };
    }

    public convertToView(value) {
        if (value.maker && value.model)
            return `${value.maker},${value.model}`;
        if (!value.maker)
            return `any`;
        if (!value.model)
            return `${value.maker},any`;
    }
    public resetValue() {
        return {
            maker: '',
            model: ''
        };
    }
}
