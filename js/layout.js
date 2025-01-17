onClickSearch = () => {
	var searchText = $('#searchInput').val();
	if (!searchText) return;
	location.href = '/Search?q=' + encodeURIComponent(searchText)
}

onClickGo = () => {
	var searchText = $('#searchInput').val();
	if (!searchText) return;
	location.href = '/w/' + searchText
}

import Common from '~/mixins/common';
import Alert from '~/components/alert';
import SeedLinkButton from '~/components/seedLinkButton';
import LocalDate from '~/components/localDate';
import RecentCard from './layouts/recentCard';
import SearchForm from './layouts/searchForm';
import ContentTool from './layouts/contentTool';
import Dropdown from './components/dropdown';
import SettingModal from './components/settingModal';
import License from "raw-loader!./LICENSE";

export default {
    mixins: [Common],
    components: {
        Alert,
        SeedLinkButton,
        LocalDate,
        RecentCard,
        SearchForm,
        Dropdown,
        ContentTool
    },
    data() {
        return {
            License,
            isShowACLMessage: false
        };
    },
    watch: {
        $route() {
            this.isShowACLMessage = false;
        }
    },
    head() {
        return {
            meta: [{ name: 'theme-color', content: this.brand_color }]
        };
    },
    computed: {
        brand_color() {
            return this.selectByTheme(this.$store.state.config['skin.liberty.brand_color_1'] ?? '#4188f1', '#2d2f34');
        },
        skinConfig() {
            return {
                '--liberty-brand-color': this.brand_color,
                '--liberty-brand-dark-color': this.selectByTheme(this.$store.state.config['skin.liberty.brand_dark_color_1'] ?? this.darkenColor(this.brand_color), '#16171a'),
                '--liberty-brand-bright-color': this.selectByTheme(this.$store.state.config['skin.liberty.brand_bright_color_1'] ?? this.lightenColor(this.brand_color), '#383b40'),
                '--liberty-navbar-logo-image': this.$store.state.config['skin.liberty.navbar_logo_image'],
                '--liberty-navbar-logo-minimum-width': this.$store.state.config['skin.liberty.navbar_logo_minimum_width'],
                '--liberty-navbar-logo-width': this.$store.state.config['skin.liberty.navbar_logo_width'],
                '--liberty-navbar-logo-size': this.$store.state.config['skin.liberty.navbar_logo_size'],
                '--liberty-navbar-logo-padding': this.$store.state.config['skin.liberty.navbar_logo_padding'],
                '--liberty-navbar-logo-margin': this.$store.state.config['skin.liberty.navbar_logo_margin'],
                '--brand-color-1': 'var(--liberty-brand-color)',
                '--brand-color-2': this.selectByTheme(this.$store.state.config['skin.liberty.brand_color_2'] ?? 'var(--liberty-brand-color)', 'var(--liberty-brand-color)'),
                '--brand-bright-color-1': 'var(--liberty-brand-bright-color)',
                '--brand-bright-color-2': this.selectByTheme(this.$store.state.config['skin.liberty.brand_bright_color_2'] ?? 'var(--liberty-brand-bright-color)', 'var(--liberty-brand-bright-color)'),
                '--text-color': this.selectByTheme('#373a3c', '#ddd'),
                '--article-background-color': this.selectByTheme('#fff', '#000'),
            };
        },
        requestable() {
            return this.$store.state.page.data.editable === true && this.$store.state.page.data.edit_acl_message && this.$store.state.page.viewName !== 'notfound';
        }
    },
    methods: {
        showEditMessage() {
            if (this.isShowACLMessage) {
                this.$router.push(this.doc_action_link(this.$store.state.page.data.document, this.requestable ? 'new_edit_request' : 'edit'));
            }
            else {
                this.isShowACLMessage = true;
            }
        },
        darkenColor(hex, percent=50) {
            let r = parseInt(hex.substring(1, 3), 16);
            let g = parseInt(hex.substring(3, 5), 16);
            let b = parseInt(hex.substring(5, 7), 16);

            r = Math.round(r * (1 - percent / 100));
            g = Math.round(g * (1 - percent / 100));
            b = Math.round(b * (1 - percent / 100));

            return "#" + ((r < 16 ? "0" : "") + r.toString(16)) + ((g < 16 ? "0" : "") + g.toString(16)) + ((b < 16 ? "0" : "") + b.toString(16));
        },
        lightenColor(hex, percent=50) {
            let r = parseInt(hex.substring(1, 3), 16);
            let g = parseInt(hex.substring(3, 5), 16);
            let b = parseInt(hex.substring(5, 7), 16);

            r = Math.round(r + (255 - r) * (percent / 100));
            g = Math.round(g + (255 - g) * (percent / 100));
            b = Math.round(b + (255 - b) * (percent / 100));

            return "#" + ((r < 16 ? "0" : "") + r.toString(16)) + ((g < 16 ? "0" : "") + g.toString(16)) + ((b < 16 ? "0" : "") + b.toString(16));
        },
        selectByTheme(light, dark) {
            return this.$store.state.currentTheme === 'dark' ? dark : light;
        },
        openSettingModal() {
            this.$vfm.show({ component: SettingModal });
        }
    }
}