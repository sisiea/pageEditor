/*
 * @Author: z00382069 zhangxinghai 
 * @Date: 2017-08-24 15:39:02 
 * @Last Modified by: z00382069 zhangxinghai
 * @Last Modified time: 2017-08-25 11:21:59
 */
import * as React from 'react';
import { ConfigStore, EmitterKeys } from '../../store/react_emitter_store';
import { BaseComponent } from '../../../frame/components/BaseComponent';
import { FormattedMessage, injectIntl } from 'react-intl';
import { get, generateRestUrl } from "../../../frame/util/RestUtil";
import './Footer.less';
class Footer extends BaseComponent<any, any> {
    constructor(props) {
        super(props);
    }
    private links = [
		{
			item: {
				linkId: '1',
				desc: 'Footer.Product&Solutions',
			},
			children: [
				{
					item: {
						linkId: '1.1',
						desc: 'Footer.Product',
						
					}
				},
				{
					item: {
						linkId: '1.2',
						desc: 'Footer.Solution',
						
					}
				}
			]
		},
		{
			item: {
				linkId: '2',
				desc: 'Footer.Support',
			},
			children: [
				{
					item: {
						linkId: '2.1',
						desc: 'Footer.SubmitServiceRequest',
						
					}
				},
				{
					item: {
						linkId: '2.2',
						desc: 'Footer.LocalSupportCenter',
						
					}
				},
				{
					item: {
						linkId: '2.3',
						desc: 'Footer.SecurityCapabilityCenter',
						
					}
				},
				{
					item: {
						linkId: '2.4',
						desc: 'Footer.TechnicalForum',
					
					}
				}
			]
		},
		{
			item: {
				linkId: '3',
				desc: 'Footer.HowToBuy',
			},
			children: [
				{
					item: {
						linkId: '3.1',
						desc: 'Footer.ContactReseller',
						
					}
				}
			]
		},
		{
			item: {
				linkId: '4',
				desc: 'Footer.BecomeAPartner',
			},
			children: [
				{
					item: {
						linkId: '4.1',
						desc: 'Footer.PartnerRegister',
						
					}
				},
				{
					item: {
						linkId: '4.2',
						desc: 'Footer.PartnerCertify',
						
					}
				},
				{
					item: {
						linkId: '4.3',
						desc: 'Footer.BecomeAISV',
					}
				}
			]
		},
		{
			item: {
				linkId: '5',
				desc: 'Footer.Training',
			},
			children: [
				{
					item: {
						linkId: '5.3',
						desc: 'Footer.LearnPartners',
						
					}
				}
			]
		},
		{
			item: {
				linkId: '6',
				desc: 'Footer.Links',
			},
			children: [
				{
					item: {
						linkId: '6.1',
						desc: 'Footer.Publications',
					}
				},
				{
					item: {
						linkId: '6.2',
						desc: 'Footer.Newsletter',
					}
				},
				{
					item: {
						linkId: '6.3',
						desc: 'Footer.RSS',
					}
				},
				{
					item: {
						linkId: '6.4',
						desc: 'Footer.eDesigner',
					}
				},
				{
					item: {
						linkId: '6.5',
						desc: 'Footer.WarrantyPolicy',
					}
				}
			]
		}
	]
    componentWillMount() {
    }

    renderL2Link(l2Links: any) {
		return l2Links.map((link: any) => {
			return (
				<div key={link.item.linkId}>
					<a target='_blank' className = 'footer-l2link' href={link.item.linkPath}>{this.getMessage(link.item.desc)} </a>
				</div>)
		});
	}

	renderL1Link(l1Links: any) {
		return l1Links.map((link: any) => {
			let l2Links: any = [];
			if (!!link.children) {
				l2Links = this.renderL2Link(link.children);
			}
			return (
				<div key={link.item.linkId}>
					<span className = 'footer-l1link'>{this.getMessage(link.item.desc)}</span>
					{l2Links}
				</div>)
		});
	}

    /*render() {
        const l1Links = this.renderL1Link(this.links);
        return (
            <div className="catalog-footer">
                <div className="catalog-footer-links">
                    {l1Links}
                </div>
                <div className="catalog-footer-display"></div>
            </div>
        )
    }*/
	    render() {
        const l1Links = this.renderL1Link(this.links);
        return (
            <div className="catalog-footer">
                <div className="catalog-footer-links">
                </div>
                <div className="catalog-footer-display"></div>
            </div>
        )
    }
}

export default injectIntl(Footer)