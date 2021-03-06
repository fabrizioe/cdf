/*!
 * Copyright 2002 - 2014 Webdetails, a Pentaho company.  All rights reserved.
 *
 * This software was developed by Webdetails and is provided under the terms
 * of the Mozilla Public License, Version 2.0, or any later version. You may not use
 * this file except in compliance with the license. If you need a copy of the license,
 * please go to  http://mozilla.org/MPL/2.0/. The Initial Developer is Webdetails.
 *
 * Software distributed under the Mozilla Public License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or  implied. Please refer to
 * the license for the specific language governing your rights and limitations.
 */

define(['amd!../lib/underscore', '../lib/jquery', './ActionComponent'],
  function(_, $, ActionComponent) {

  var ButtonComponent = ActionComponent.extend({
    _docstring: function() {
      return "Button Component that triggers a server action when clicked";
    },

    render: function() {
      var myself = this;
      var b = $("<button type='button'/>")
        .text(typeof myself.label === 'function' ? myself.label() : myself.label)
        .unbind("click")
        .bind("click", function() {
          var proceed = true;
          if(_.isFunction(myself.expression)) {
            proceed = myself.expression.apply(myself, arguments);
          }
          if(myself.hasAction() && !(proceed === false)) {
            return myself.triggerAction.apply(myself);
          }
        });
      if(_.isUndefined(myself.buttonStyle) || myself.buttonStyle === "themeroller") {
        b.button();
      }
      b.appendTo(myself.placeholder().empty());
      myself._doAutoFocus();
    },

    /**
     * Disables the button (grays it out and prevents click events)
     */
    disable: function() {
      this.placeholder('button').attr('disabled', 'disabled');
    },

    /**
     * Enables the button
     */
    enable: function() {
      this.placeholder('button').removeAttr('disabled');
    },

    /**
     * Changes the label shown on the button
     */
    setLabel: function(label) {
      this.label = label.toString();
      this.placeholder('button').text(this.label);
    }
  });

  return ButtonComponent;

});
